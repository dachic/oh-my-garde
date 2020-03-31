<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass="App\Repository\PharmacyRepository")
 */
class Pharmacy
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
     * @ORM\Column(type="string", length=255)
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $phoneNumber;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $hospitalName;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Guard", mappedBy="pharmacy")
     */
    private $guards;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Intership", mappedBy="pharmacy")
     */
    private $interships;

    /**
     * @ORM\ManyToMany(targetEntity="App\Entity\Agrement", inversedBy="pharmacies")
     */
    private $agrements;

    public function __construct()
    {
        $this->guards = new ArrayCollection();
        $this->interships = new ArrayCollection();
        $this->agrements = new ArrayCollection();
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

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getPhoneNumber(): ?string
    {
        return $this->phoneNumber;
    }

    public function setPhoneNumber(string $phoneNumber): self
    {
        $this->phoneNumber = $phoneNumber;

        return $this;
    }

    public function getHospitalName(): ?string
    {
        return $this->hospitalName;
    }

    public function setHospitalName(string $hospitalName): self
    {
        $this->hospitalName = $hospitalName;

        return $this;
    }

    /**
     * @return Collection|Guard[]
     */
    public function getGuards(): Collection
    {
        return $this->guards;
    }

    public function addGuard(Guard $guard): self
    {
        if (!$this->guards->contains($guard)) {
            $this->guards[] = $guard;
            $guard->setPharmacy($this);
        }

        return $this;
    }

    public function removeGuard(Guard $guard): self
    {
        if ($this->guards->contains($guard)) {
            $this->guards->removeElement($guard);
            // set the owning side to null (unless already changed)
            if ($guard->getPharmacy() === $this) {
                $guard->setPharmacy(null);
            }
        }

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
            $intership->setPharmacy($this);
        }

        return $this;
    }

    public function removeIntership(Intership $intership): self
    {
        if ($this->interships->contains($intership)) {
            $this->interships->removeElement($intership);
            // set the owning side to null (unless already changed)
            if ($intership->getPharmacy() === $this) {
                $intership->setPharmacy(null);
            }
        }

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