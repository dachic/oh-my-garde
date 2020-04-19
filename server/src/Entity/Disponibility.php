<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use Gedmo\Timestampable\Traits\TimestampableEntity;
use ApiPlatform\Core\Serializer\Filter\PropertyFilter;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass="App\Repository\DisponibilityRepository")
 * @ApiFilter(SearchFilter::class, properties={"user.id": "exact","day": "exact", "hour.id": "exact"})
 * @ApiFilter(PropertyFilter::class, arguments={"parameterName": "properties", "overrideDefaultProperties": false})
 */
class Disponibility
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
    private $day;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User", inversedBy="disponibilities")
     */
    private $user;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\DisponibilityHour", cascade={"persist", "remove"})
     */
    private $hour;

    public function getId(): ?int
    {
        return $this->id;
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

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

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
}
