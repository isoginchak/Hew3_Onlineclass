<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AnswerRestData extends Model
{
    protected $table = 'questions';
    protected $fillable = [
        //テーブルのカラム
        'user_id','class_id', 'question', 'share','answer','solve'
    ];

}
