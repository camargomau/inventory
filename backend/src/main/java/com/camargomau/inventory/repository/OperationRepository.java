package com.camargomau.inventory.repository;

import com.camargomau.inventory.entity.Operation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

// Repository interface for Item entity

public interface OperationRepository extends JpaRepository<Operation, Integer> {
	List<Operation> findByItem_ItemId(Integer itemId);
	List<Operation> findByUser_UserId(Integer userId);
}
