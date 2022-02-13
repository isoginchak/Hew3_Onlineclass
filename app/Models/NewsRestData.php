<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class NewsRestData extends Model
{
    protected $table = 'newses';
    protected $fillable = [
        //テーブルのカラム
        'user_id','address_class_id', 'news_title', 'news_content','created_at'
    ];

    protected $dates = [
        'created_at'
    ];
    
}
