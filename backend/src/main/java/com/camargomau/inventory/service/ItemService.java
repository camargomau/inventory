package com.camargomau.inventory.service;

import com.camargomau.inventory.dto.ItemRequest;
import com.camargomau.inventory.dto.ItemResponse;
import com.camargomau.inventory.entity.Item;
import com.camargomau.inventory.entity.User;
import com.camargomau.inventory.entity.Operation;
import com.camargomau.inventory.exception.ResourceNotFoundException;
import com.camargomau.inventory.repository.ItemRepository;
import com.camargomau.inventory.repository.OperationRepository;
import com.camargomau.inventory.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;
import java.util.stream.Collectors;

// Service class that handles CRUD operations for inventory items

@Service
@RequiredArgsConstructor
public class ItemService {

	// Repository for accessing item data in the database
	private final ItemRepository itemRepository;
	private final OperationRepository operationRepository;
	private final UserRepository userRepository;

	// Get current authenticated user
	private User getCurrentUser() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		String email = authentication.getName();
		return userRepository.findByEmail(email)
				.orElseThrow(() -> new RuntimeException("Authenticated user not found"));
	}

	// Retrieves all items from the inventory
	// Returns a List of ItemResponse DTOs
	public List<ItemResponse> getAllItems() {
		return itemRepository.findAll().stream()
				.map(this::toResponse)
				.collect(Collectors.toList());
	}

	// Retrieves a specific item by its ID
	// Returns an ItemResponse DTO
	public ItemResponse getItemById(Integer id) {
		Item item = itemRepository.findByItemId(id)
				.orElseThrow(() -> new ResourceNotFoundException("Item not found with id: " + id));
		return toResponse(item);
	}

	// Creates a new item in the inventory
	// Returns an ItemResponse DTO for the created item
	public ItemResponse createItem(ItemRequest request) {
		Item item = Item.builder()
				.name(request.getName())
				.description(request.getDescription())
				.sku(request.getSku())
				.price(request.getPrice())
				.quantity(request.getQuantity())
				.build();
		Item saved = itemRepository.save(item);

		// Log operation
		Operation op = Operation.builder()
				.user(getCurrentUser())
				.item(saved)
				.operationType(Operation.OperationType.add)
				.quantityBefore(0)
				.quantityAfter(saved.getQuantity())
				.build();
		operationRepository.save(op);

		return toResponse(saved);
	}

	// Updates an existing item
	// Returns an ItemResponse DTO for the updated item
	public ItemResponse updateItem(Integer id, ItemRequest request) {
		Item item = itemRepository.findByItemId(id)
				.orElseThrow(() -> new ResourceNotFoundException("Item not found with id: " + id));
		int quantityBefore = item.getQuantity();

		item.setName(request.getName());
		item.setDescription(request.getDescription());
		item.setSku(request.getSku());
		item.setPrice(request.getPrice());
		item.setQuantity(request.getQuantity());
		Item updated = itemRepository.save(item);

		// Log operation
		Operation op = Operation.builder()
				.user(getCurrentUser())
				.item(updated)
				.operationType(Operation.OperationType.update)
				.quantityBefore(quantityBefore)
				.quantityAfter(updated.getQuantity())
				.build();
		operationRepository.save(op);

		return toResponse(updated);
	}

	// Deletes an item by its ID
	public void deleteItem(Integer id) {
		Item item = itemRepository.findByItemId(id)
				.orElseThrow(() -> new ResourceNotFoundException("Item not found with id: " + id));
		int quantityBefore = item.getQuantity();

		// Log operation before deletion
		Operation op = Operation.builder()
				.user(getCurrentUser())
				.item(item)
				.operationType(Operation.OperationType.delete)
				.quantityBefore(quantityBefore)
				.quantityAfter(0)
				.build();
		operationRepository.save(op);

		itemRepository.delete(item);
	}

	// Deletes an item and returns its data before deletion
	// Returns an ItemResponse DTO for the deleted item
	public ItemResponse deleteItemAndReturn(Integer id) {
		Item item = itemRepository.findByItemId(id)
				.orElseThrow(() -> new ResourceNotFoundException("Item not found with id: " + id));
		ItemResponse response = toResponse(item);
		itemRepository.delete(item);
		return response;
	}

	// Converts an Item entity to an ItemResponse DTO
	private ItemResponse toResponse(Item item) {
		return ItemResponse.builder()
				.itemId(item.getItemId())
				.name(item.getName())
				.description(item.getDescription())
				.sku(item.getSku())
				.price(item.getPrice())
				.quantity(item.getQuantity())
				.createdAt(item.getCreatedAt() != null ? item.getCreatedAt().toString() : null)
				.build();
	}
}
