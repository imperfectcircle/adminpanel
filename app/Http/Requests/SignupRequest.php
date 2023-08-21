<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class SignupRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:20|unique:users,name',
            'email' => 'required|email|unique:users,email',
            'password' => [
                'required',
                'confirmed',
                Password::min(8)
                    ->letters()
                    ->symbols()
            ]
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Il campo nome utente è obbligatorio.',
            'name.max' => 'Il nome utente può avere una lunghezza massima di 20 caratteri.',
            'name.unique' => 'Il nome utente inserito esiste già.',
            'email.required' => 'Il campo email è obbligatorio.',
            'email.unique' => 'L\'indirizzo email inserito esiste già.',
            'password.required' => 'Il campo password è obbligatorio.',
            'password.confirmed' => 'Le password non corrispondono',
            'password.min' => 'La password deve avere almeno 8 caratteri.',
        ];
    }
}
