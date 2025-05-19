package com.camargomau.inventory.repository;

import com.camargomau.inventory.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;

// Repository interface for Item entity

public interface ItemRepository extends JpaRepository<Item, Integer> {
	Optional<Item> findBySku(String sku);
	Optional<Item> findByItemId(Integer itemId);
	List<Item> findAllByAvailableTrue();
	Optional<Item> findByItemIdAndAvailableTrue(Integer itemId);
	List<Item> findAllByAvailableFalse();
	Optional<Item> findByItemIdAndAvailableFalse(Integer itemId);
}
