<?php

class Ville {

    public $commune;
    public $longitude;
    public $latitude;
    public $codeinsee;
    public $population;

    public function Ville($codeinsee,$commune,$population,$latitude,$longitude)
    {
        $this->commune = $commune;
        $this->longitude = $longitude;
        $this->latitude = $latitude;
        $this->codeinsee = $codeinsee;
        $this->population = $population;
    }

    public function getLongitude() {
        return $this->longitude;
    }

    public function getLatitude() {
        return $this->latitude;
    }
        
    public function toString() {
        return ($this->commune . "(" . $this->longitude . "," . $this->latitude . ")");
    }
}


    

?>