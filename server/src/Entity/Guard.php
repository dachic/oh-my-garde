<?php

namespace App\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Gedmo\Timestampable\Traits\TimestampableEntity;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass="App\Repository\GuardRepository")
 */
class Guard
{
    use TimestampableEntity;

    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="guards")
     */
    private $user;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Pharmacy", inversedBy="guards")
     */
    private $pharmacy;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $day;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $status;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\DisponibilityHour", cascade={"persist", "remove"})
     */
    private $hour;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Job", inversedBy="guards")
     */
    private $job;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Agrement", inversedBy="guards")
     */
    private $agrement;

    public function __construct()
    {
        $this->agrement = new ArrayCollection();
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

    public function getDay(): ?string
    {
        return $this->day;
    }

    public function setDay(string $day): self
    {
        $this->day = $day;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getHour(): ?DisponibilityHour
    {
        return $this->hour;
    }

    public function setHour(?DisponibilityHour $hour): self
    {
        $this->hour = $hour;

        return $this;
    }

    public function getJob(): ?Job
    {
        return $this->job;
    }

    public function setJob(?Job $job): self
    {
        $this->job = $job;

        return $this;
    }

    /**
     * @return Collection|Agrement[]
     */
    public function getAgrements(): Collection
    {
        return $this->agrement;
    }

    public function addAgrement(Agrement $agrement): self
    {
        if (!$this->agrement->contains($agrement)) {
            $this->agrement[] = $agrement;
        }

        return $this;
    }

    public function removeAgrement(Agrement $agrement): self
    {
        if ($this->agrement->contains($agrement)) {
            $this->agrement->removeElement($agrement);
        }

        return $this;
    }
}
