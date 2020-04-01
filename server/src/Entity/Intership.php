<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Gedmo\Timestampable\Traits\TimestampableEntity;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass="App\Repository\IntershipRepository")
 */
class Intership
{
    use TimestampableEntity;

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
     * @ORM\ManyToMany(targetEntity="App\Entity\Agrement", inversedBy="interships")
     */
    private $agrements;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $position;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Hospital", inversedBy="interships")
     * @ORM\JoinColumn(nullable=false)
     */
    private $hospital;

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

    public function getPosition(): ?string
    {
        return $this->position;
    }

    public function setPosition(string $position): self
    {
        $this->position = $position;

        return $this;
    }

    public function getHospital(): ?Hospital
    {
        return $this->hospital;
    }

    public function setHospital(?Hospital $hospital): self
    {
        $this->hospital = $hospital;

        return $this;
    }
}
