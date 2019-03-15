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
use App\Security\UserConfirmationService;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\GetResponseForControllerResultEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class UserConfirmationSubscriber implements EventSubscriberInterface
{
    /**
     * @var UserConfirmationService
     */
    private $userConfirmationService;

    /**
     * UserConfirmationSubscriber constructor.
     *
     * @param UserConfirmationService $userConfirmationService
     */
    public function __construct(UserConfirmationService $userConfirmationService)
    {
        $this->userConfirmationService = $userConfirmationService;
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

        $this->userConfirmationService->confirmUser($confirmationToken->confirmationToken);

        $event->setResponse(new JsonResponse(null, Response::HTTP_OK));
    }
}
