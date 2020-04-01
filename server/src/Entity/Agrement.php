<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass="App\Repository\AgrementRepository")
 */
class Agrement
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Intership", mappedBy="agrements")
     */
    private $interships;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $code;

    public function __construct()
    {
        $this->interships = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection|Intership[]
     */
    public function getInterships(): Collection
    {
        return $this->interships;
    }

    public function addIntership(Intership $intership): self
    {
        if (!$this->interships->contains($intership)) {
            $this->interships[] = $intership;
            $intership->addAgrement($this);
        }

        return $this;
    }

    public function removeIntership(Intership $intership): self
    {
        if ($this->interships->contains($intership)) {
            $this->interships->removeElement($intership);
            $intership->removeAgrement($this);
        }

        return $this;
    }

    public function getCode(): ?string
    {
        return $this->code;
    }

    public function setCode(string $code): self
    {
        $this->code = $code;

        return $this;
    }
}
