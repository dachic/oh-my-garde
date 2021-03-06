<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Gedmo\Timestampable\Traits\TimestampableEntity;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Bridge\Elasticsearch\DataProvider\Filter\OrderFilter;
use ApiPlatform\Core\Serializer\Filter\PropertyFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass="App\Repository\PharmacyRepository")
 * @ApiFilter(OrderFilter::class, properties={"hospitalName"="asc"})
 * @ApiFilter(PropertyFilter::class, arguments={"parameterName": "properties", "overrideDefaultProperties": false})
 * @ApiFilter(SearchFilter::class, properties={"hospital.region.id": "exact"})
 */
class Pharmacy
{
    use TimestampableEntity;

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
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=255, nullable=true)
     */
    private $phoneNumber;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Guard", mappedBy="pharmacy")
     */
    private $guards;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\User", mappedBy="pharmacy", cascade={"persist", "remove"})
     */
    private $representative;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\Hospital", inversedBy="pharmacy", cascade={"persist", "remove"})
     * @ORM\JoinColumn(nullable=false)
     */
    private $hospital;

    public function __construct()
    {
        $this->guards = new ArrayCollection();
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

    public function getRepresentative(): ?User
    {
        return $this->representative;
    }

    public function setRepresentative(?User $representative): self
    {
        $this->representative = $representative;

        // set (or unset) the owning side of the relation if necessary
        $newPharmacy = null === $representative ? null : $this;
        if ($representative->getPharmacy() !== $newPharmacy) {
            $representative->setPharmacy($newPharmacy);
        }

        return $this;
    }

    public function getHospital(): ?Hospital
    {
        return $this->hospital;
    }

    public function setHospital(Hospital $hospital): self
    {
        $this->hospital = $hospital;

        return $this;
    }
}
