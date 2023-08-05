<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Contracts\Encryption\DecryptException;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'company_id',
        'password_changed',
        'google2fa_secret',
        'upline_id',
        'code'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        // 'permission'
    ];

    protected $appends = [
        'permission',
        'referrallink',
        'affilate'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function company()
    {
        return  $this->belongsTo(Company::class);
    }

    public function getPermissionAttribute()
    {
        return array_column($this->getAllPermissions()->toArray(), 'name');
    }

    protected function google2faSecret(): Attribute
    {
        return new Attribute(
            get: fn ($value) =>  $value ? Crypt::decryptString($value) : null,
            set: fn ($value) =>  $value ? Crypt::encryptString($value) : null,
        );
    }

    public function getReferrallinkAttribute()
    {
        return route('register') . '?ref=' . $this->code;
    }

    public function getAffilateAttribute()
    {
        return $this->hasMany('App\Models\User', 'upline_id')->select(['email', 'name', 'transactions'])->get()->toArray();
    }

    public function makeVisible($attributes)
    {
        $this->hidden = array_diff($this->hidden, (array) $attributes);

        return $this;
    }

    public function makeHidden($attributes)
    {
        $this->hidden = array_push($this->hidden, (array) $attributes);

        return $this;
    }
}
