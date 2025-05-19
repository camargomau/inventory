package com.camargomau.inventory.controller;

import com.camargomau.inventory.dto.ItemRequest;
import com.camargomau.inventory.dto.ItemResponse;
import com.camargomau.inventory.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

// REST controller for items

@RestController
@RequestMapping("/api/items")
@RequiredArgsConstructor
public class ItemController {

	private final ItemService itemService;

	// GET /api/items returns all items
	@GetMapping
	public List<ItemResponse> getAllItems() {
		return itemService.getAllItems();
	}

	// GET /api/items/{id} returns a specific item
	@GetMapping("/{id}")
	public ItemResponse getItemById(@PathVariable Integer id) {
		return itemService.getItemById(id);
	}

	// POST /api/items creates a new item
	@PostMapping
	public ResponseEntity<ItemResponse> createItem(@RequestBody @Valid ItemRequest request) {
		ItemResponse created = itemService.createItem(request);
		return ResponseEntity.status(201).body(created);
	}

	// PUT /api/items/{id} updates a specific item
	@PutMapping("/{id}")
	public ItemResponse updateItem(@PathVariable Integer id, @RequestBody @Valid ItemRequest request) {
		return itemService.updateItem(id, request);
	}

	// DELETE /api/items/{id} deletes a specific item
	@DeleteMapping("/{id}")
	public ResponseEntity<ItemResponse> deleteItem(@PathVariable Integer id) {
		ItemResponse deleted = itemService.deleteItemAndReturn(id);
		return ResponseEntity.ok(deleted);
	}

	// GET /api/items/deleted returns all deleted items
	@GetMapping("/deleted")
	public List<ItemResponse> getDeletedItems() {
		return itemService.getDeletedItems();
	}

	// PUT /api/items/{id}/restore restores a deleted item
	@PutMapping("/{id}/restore")
	public ItemResponse restoreItem(@PathVariable Integer id) {
		return itemService.restoreItem(id);
	}
}
