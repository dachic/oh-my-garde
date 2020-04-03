<?php
namespace App\Service;
use Symfony\Component\Mime\Email;
use Symfony\Component\Mailer\MailerInterface;
/**
 * Class MailerService
 *
 * @package App\Services
 */
class MailerService
{
    /**
     * @var Mailer
     */
    private $mailer;
    /**
     * Mailer constructor.
     *
     * @param Mailer $mailer
     */
    public function __construct(MailerInterface $mailer)
    {
        $this->mailer = $mailer;
    }
    public function send($to, string $subject, string $view): void
    {
        $message = (new Email())
            ->from($_ENV['APP_EMAIL_FROM'])
            ->to($to)
            ->subject($subject)
            ->html($view);
        $this->mailer->send($message);
    }
    public function sendWithCC($to, string $subject, string $view, string $cc): void
    {
        $message = (new Email())
            ->from($_ENV['APP_EMAIL_FROM'])
            ->to($to)
            ->cc($cc)
            ->subject($subject)
            ->html($view);
        $this->mailer->send($message);
    }
}
