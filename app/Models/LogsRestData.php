<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class LogsRestData extends Model
{
    protected $table = 'logs';
    protected $fillable = [
        //テーブルのカラム
        'user_id','class_id', 'in_date','out_date','noface_time'
    ];

    protected $dates = [
        'in_date','out_date'
    ];
}
