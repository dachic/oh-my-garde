<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass="App\Repository\IntershipRepository")
 */
class Intership
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="interships")
     */
    private $user;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Pharmacy", inversedBy="interships")
     */
    private $pharmacy;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Agrement", inversedBy="interships")
     */
    private $agrements;

    public function __construct()
    {
        $this->agrements = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    public function getPharmacy(): ?Pharmacy
    {
        return $this->pharmacy;
    }

    public function setPharmacy(?Pharmacy $pharmacy): self
    {
        $this->pharmacy = $pharmacy;

        return $this;
    }

    /**
     * @return Collection|Agrement[]
     */
    public function getAgrements(): Collection
    {
        return $this->agrements;
    }

    public function addAgrement(Agrement $agrement): self
    {
        if (!$this->agrements->contains($agrement)) {
            $this->agrements[] = $agrement;
        }

        return $this;
    }

    public function removeAgrement(Agrement $agrement): self
    {
        if ($this->agrements->contains($agrement)) {
            $this->agrements->removeElement($agrement);
        }

        return $this;
    }
}
