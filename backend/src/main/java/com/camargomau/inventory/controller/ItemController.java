package com.camargomau.inventory.controller;

import com.camargomau.inventory.dto.ItemRequest;
import com.camargomau.inventory.dto.ItemResponse;
import com.camargomau.inventory.service.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/items")
@RequiredArgsConstructor
public class ItemController {

    private final ItemService itemService;

    @GetMapping
    public List<ItemResponse> getAllItems() {
        return itemService.getAllItems();
    }

    @GetMapping("/{id}")
    public ItemResponse getItemById(@PathVariable Integer id) {
        return itemService.getItemById(id);
    }

    @PostMapping
    public ResponseEntity<ItemResponse> createItem(@RequestBody ItemRequest request) {
        ItemResponse created = itemService.createItem(request);
        return ResponseEntity.status(201).body(created);
    }

    @PutMapping("/{id}")
    public ItemResponse updateItem(@PathVariable Integer id, @RequestBody ItemRequest request) {
        return itemService.updateItem(id, request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ItemResponse> deleteItem(@PathVariable Integer id) {
        ItemResponse deleted = itemService.deleteItemAndReturn(id);
        return ResponseEntity.ok(deleted);
    }
}
