package com.camargomau.inventory.dto;

import lombok.*;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ItemResponse {
    private Integer itemId;
    private String name;
    private String description;
    private String sku;
    private BigDecimal price;
    private Integer quantity;
    private String createdAt;
}
