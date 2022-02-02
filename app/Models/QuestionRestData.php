<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QuestionRestData extends Model
{
    protected $table = 'questions';
    protected $fillable = [
        //テーブルのカラム
        'user_id','class_id', 'question', 'share',
    ];

}
