<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Security\Core\User\UserInterface;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass="App\Repository\UserRepository")
 */
class User  implements UserInterface
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
    private $firstname;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $lastname;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $email;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $password;

    /**
     * @ORM\Column(type="json")
     */
    private $roles = [];

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $phoneNumber;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $status;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Disponibility", mappedBy="user")
     */
    private $disponibilities;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Guard", mappedBy="user")
     */
    private $guards;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Intership", mappedBy="user")
     */
    private $interships;

    public function __construct()
    {
        $this->disponibilities = new ArrayCollection();
        $this->guards = new ArrayCollection();
        $this->interships = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFirstname(): ?string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;

        return $this;
    }

    public function getLastname(): ?string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): self
    {
        $this->lastname = $lastname;

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

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getRoles(): ?array
    {
        return $this->roles;
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

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

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    /**
     * @return Collection|Disponibility[]
     */
    public function getDisponibilities(): Collection
    {
        return $this->disponibilities;
    }

    public function addDisponibility(Disponibility $disponibility): self
    {
        if (!$this->disponibilities->contains($disponibility)) {
            $this->disponibilities[] = $disponibility;
            $disponibility->setUser($this);
        }

        return $this;
    }

    public function removeDisponibility(Disponibility $disponibility): self
    {
        if ($this->disponibilities->contains($disponibility)) {
            $this->disponibilities->removeElement($disponibility);
            // set the owning side to null (unless already changed)
            if ($disponibility->getUser() === $this) {
                $disponibility->setUser(null);
            }
        }

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
            $guard->setUser($this);
        }

        return $this;
    }

    public function removeGuard(Guard $guard): self
    {
        if ($this->guards->contains($guard)) {
            $this->guards->removeElement($guard);
            // set the owning side to null (unless already changed)
            if ($guard->getUser() === $this) {
                $guard->setUser(null);
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
            $intership->setUser($this);
        }

        return $this;
    }

    public function removeIntership(Intership $intership): self
    {
        if ($this->interships->contains($intership)) {
            $this->interships->removeElement($intership);
            // set the owning side to null (unless already changed)
            if ($intership->getUser() === $this) {
                $intership->setUser(null);
            }
        }

        return $this;
    }

    public function getSalt()
    {
        // TODO: Implement getSalt() method.
    }

    public function getUsername()
    {
        // TODO: Implement getUsername() method.
    }

    public function eraseCredentials()
    {
        // TODO: Implement eraseCredentials() method.
    }


}
