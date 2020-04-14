<?php

namespace App\Command;

use App\Command\AddAgrementCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\ArrayInput;
use Symfony\Component\Console\Style\SymfonyStyle;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class InsertAllAgrementCommand extends Command
{
    protected static $defaultName = 'app:agrement:register-all';

    protected function configure()
    {
        $this
            ->setDescription('Insert all initial agrement data')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $io = new SymfonyStyle($input, $output);

        $commandName = AddAgrementCommand::getDefaultName();
        $command = $this->getApplication()->find($commandName);

        foreach ($this->getAgrements() as $code => $name) {
            $arguments = [
                'command' => $commandName,
                'code'    => $code,
                'name'    => $name,
            ];

            $agrementInput = new ArrayInput($arguments);
            $returnCode = $command->run($agrementInput, $output);
            if ($returnCode != 0) {
                $io->note("Command fails with agrement with code : $code");
                break;
            }
        }

        return 0;
    }

    private function getAgrements()
    {
        return [
            '108' => 'Pharmacie Clinique',
            '109' => 'Economie & Vigilance',
            '110' => 'Préparation et contrôles',
            '111' => 'Dispositifs médicaux stériles & stérilisation.'
        ];
    }
}
