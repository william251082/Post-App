<?php
/**
 * Created by PhpStorm.
 * User: williamdelrosario
 * Date: 2019-03-18
 * Time: 10:11
 */

namespace App\Exception;

use Exception;
use Throwable;

class InvalidConfirmationTokenException extends Exception
{
    public function __construct(string $message = "", int $code = 0, Throwable $previous = null)
    {
        parent::__construct('Confirmation Token is invalid', $code, $previous);
    }
}
