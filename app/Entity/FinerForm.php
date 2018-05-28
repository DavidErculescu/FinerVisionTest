<?php

namespace App\Entity;

use Illuminate\Database\Eloquent\Model;

class FinerForm extends Model
{
    protected $fillable = [
        'firstname',
        'surname',
        'email',
        'number',
        'birth',
        'gender',
        'comments'
    ];
}
