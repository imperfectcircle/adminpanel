<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAuthorRequest extends FormRequest
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
            'first_name' => 'required|string|min:3',
            'last_name' => 'required|string|min:3'
        ];
    }

    public function messages()
    {
        return [
            'first_name.required' => 'Il campo Nome è obbligatorio.',
            'first_name.min' => 'Il campo Nome deve contenere almeno 3 caratteri.',
            'last_name.required' => 'Il campo Cognome è obbligatorio.',
            'last_name.min' => 'Il campo Cognome deve contenere almeno 3 caratteri.',
        ];
    }
}
