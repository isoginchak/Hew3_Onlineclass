<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NewsData extends Model
{
    protected $table = 'newses';
    protected $dates = [
        'created_at'
    ];
    
}
