<?php
/**
 * Created by PhpStorm.
 * User: williamdelrosario
 * Date: 2019-03-15
 * Time: 14:36
 */

namespace App\EventSubscriber;

use ApiPlatform\Core\EventListener\EventPriorities;
use App\Entity\UserConfirmation;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\GetResponseForControllerResultEvent;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\KernelEvents;

class UserConfirmationSubscriber implements EventSubscriberInterface
{
    /**
     * @var UserRepository
     */
    private $userRepository;
    /**
     * @var EntityManagerInterface
     */
    private $entityManager;

    /**
     * UserConfirmationSubscriber constructor.
     *
     * @param UserRepository $userRepository
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(UserRepository $userRepository, EntityManagerInterface $entityManager)
    {
        $this->userRepository = $userRepository;
        $this->entityManager = $entityManager;
    }

    /**
     * @return array
     */
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['confirmUser', EventPriorities::POST_VALIDATE]
        ];
    }

    /**
     * @param GetResponseForControllerResultEvent $event
     */
    public function confirmUser(GetResponseForControllerResultEvent $event)
    {
        $request = $event->getRequest();

        if ('api_user_confirmations_post_collection' !== $request->get('_route')) {
            return;
        }

        /** @var UserConfirmation $confirmationToken */
        $confirmationToken = $event->getControllerResult();

        $user = $this->userRepository->findOneBy(
            ['confirmationToken' => $confirmationToken->confirmationToken]
        );

        // User was NOT found by confirmation Token
        if (!$user) {
            throw new NotFoundHttpException();
        }

        $user->setEnabled(true);
        $user->setConfirmationToken(null);
        $this->entityManager->flush();

        $event->setResponse(new JsonResponse(null, Response::HTTP_OK));
    }
}
