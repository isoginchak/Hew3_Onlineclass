<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class LogsRestData extends Model
{
    protected $table = 'logs';
    protected $fillable = [
        //テーブルのカラム
        'user_id','class_id','total_noface_time','max_noface_time','leave_time','created_at','updated_at',
    ];
    protected $dates = [
        'created_at','updated_at',
    ];

 
}
