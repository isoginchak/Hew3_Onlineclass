<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UsersRestData extends Model
{
    protected $table = 'users';
    protected $guarded = array('id');

    public static $rules = array(
        'id' => 'required',
    );

}
