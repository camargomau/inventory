package com.camargomau.inventory.repository;

import com.camargomau.inventory.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ItemRepository extends JpaRepository<Item, Integer> {
    Optional<Item> findBySku(String sku);
    Optional<Item> findByItemId(Integer itemId);
}
