<?php

namespace App\Http\Controllers\Api;

use App\Models\Comic;
use App\Models\Author;
use App\Http\Controllers\Controller;
use App\Http\Resources\ComicResource;
use App\Http\Requests\StoreComicRequest;
use App\Http\Requests\UpdateComicRequest;

class ComicController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return ComicResource::collection(
            Comic::with('author')->orderBy('id', 'desc')->get()
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreComicRequest $request)
    {
        $data = $request->validated();

        $authorId = $data['author_id'];
        if (!Author::where('id', $authorId)->exists()) {
            return response()->json(['message' => 'L\'autore specificato non esiste.'], 422);
        }

        $comic = Comic::create($data);
        return response(new ComicResource($comic), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Comic $comic)
    {
        return new ComicResource($comic);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateComicRequest $request, Comic $comic)
    {
        $data = $request->validated();
        $authorId = $data['author_id'];
        if (!Author::where('id', $authorId)->exists()) {
            return response()->json(['message' => 'L\'autore specificato non esiste.'], 422);
        }
        $comic->update($data);

        return new ComicResource($comic);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comic $comic)
    {
        $comic->delete();

        return response('', 204);
    }
}
