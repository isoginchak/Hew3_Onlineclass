<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class LogsRestData extends Model
{
    protected $table = 'logs';
    protected $fillable = [
        //テーブルのカラム
        'user_id','class_id', 'entry_exit','noface_time'
    ];

 
}
