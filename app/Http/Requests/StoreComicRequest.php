<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreComicRequest extends FormRequest
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
            'title' => 'required|string|min:2',
            'description' => 'required|string',
            'year' => 'required|min:4|max:4',
            'price' => 'required|string',
            'author_id' => 'required|exists:authors,id'
        ];
    }

    public function messages()
    {
        return [
            'title.required' => 'Il campo Titolo è obbligatorio.',
            'title.string' => 'Il campo Titolo deve essere di tipo testo',
            'title.min' => 'Il campo Titolo deve contenere almeno 2 caratteri.',
            'description.required' => 'Il campo Sinossi è obbligatorio.',
            'description.string' => 'Il campo Sinossi deve essere di tipo testo.',
            'year.required' => 'Il campo Anno è obbligatorio.',
            'year.min' => 'Il campo Anno deve essere di 4 caratteri.',
            'year.max' => 'Il campo Anno deve essere di 4 caratteri.',
            'price.required' => 'Il campo prezzo è obbligatorio.',
            'price.string' => 'Il campo Prezzo deve essere di tipo testo.',
            'author_id.required' => 'Il campo Autore è obbligatorio.',
        ];
    }
}
