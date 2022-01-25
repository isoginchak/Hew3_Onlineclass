@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Register') }}</div>

                <div class="card-body">
                    <form method="POST" action="{{ route('register') }}">
                        @csrf

                        <div class="form-group row">
                            <label for="family-name" class="col-md-4 col-form-label text-md-right">{{ __('苗字') }}</label>

                            <div class="col-md-6">
                                <input id="family-name" type="text" class="form-control @error('family-name') is-invalid @enderror" name="family-name" value="{{ old('family-name') }}" required autocomplete="family-name" autofocus>

                                @error('family-name')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                                @enderror

                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="first-name" class="col-md-4 col-form-label text-md-right">{{ __('名前') }}</label>

                            <div class="col-md-6">
                                <input id="first-name" type="text" class="form-control @error('first-name') is-invalid @enderror" name="first-name" value="{{ old('first-name') }}" required autocomplete="given-name" autofocus>

                                @error('first-name')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                                @enderror

                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="mailaddress" class="col-md-4 col-form-label text-md-right">{{ __('メールアドレス') }}</label>

                            <div class="col-md-6">
                                <input id="mailaddress" type="email" class="form-control @error('email') is-invalid @enderror" name="mailaddress" value="{{ old('mailaddress') }}" required autocomplete="email">

                                @error('mailaddress')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                                @enderror

                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="school-id" class="col-md-4 col-form-label text-md-right">{{ __('学校名') }}</label>

                            <div class="col-md-6">
                                <select type="selsect" name="school-id" id="school-id">
                                <option value="" selected>学校を選択してください</option>
                                @foreach ($items as $item)
                                <option value="{{ $item->school_id }}" >{{ $item->school_name }}</option>
                                @endforeach
                                </select>

                                @error('school-name')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                                @enderror

                            </div>
                        </div>


                        <div class="form-group row">
                            <label for="position" class="col-md-4 col-form-label text-md-right">{{ __('職業') }}</label>

                            <div class="col-md-6" style="padding-top: 8px">
                                <input id="student" type="radio" name="position" value="0" checked>
                                <label for="student">生徒</label>
                                <input id="teacher" type="radio" name="position" value="1">
                                <label for="teacher">教師</label>

                                @if ($errors->has('position'))
                                <span class="invalid-feedback">
                                    <strong>{{ $errors->first('position') }}</strong>
                                </span>
                                @endif
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="password" class="col-md-4 col-form-label text-md-right">{{ __('パスワード') }}</label>

                            <div class="col-md-6">
                                <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="new-password">

                                @error('password')
                                <span class="invalid-feedback" role="alert">
                                    <strong>{{ $message }}</strong>
                                </span>
                                @enderror

                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="password-confirm" class="col-md-4 col-form-label text-md-right">{{ __('パスワード 確認') }}</label>

                            <div class="col-md-6">
                                <input id="password-confirm" type="password" class="form-control" name="password_confirmation" required autocomplete="new-password">
                            </div>
                        </div>

                        <div class="form-group row mb-0">
                            <div class="col-md-6 offset-md-4">
                                <button type="submit" class="btn btn-primary">
                                    {{ __('Register') }}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection