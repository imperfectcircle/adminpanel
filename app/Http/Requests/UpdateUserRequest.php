<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rules\Password;
use Illuminate\Foundation\Http\FormRequest;

class UpdateUserRequest extends FormRequest
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
            'name' => 'required|string|max:20|unique:users,name,'.$this->id,
            'email' => 'required|email|unique:users,email,'.$this->id,
            'password' => [
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
            'password.confirmed' => 'Le password non corrispondono',
            'password.min' => 'La password deve avere almeno 8 caratteri.',
        ];
    }
}
