package com.camargomau.inventory.dto;

import lombok.*;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;

// Requesting an Item requires name, description, sku, price, quantity

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ItemRequest {
    @NotBlank
    @Size(max = 100)
    private String name;

    @Size(max = 255)
    private String description;

    @NotBlank
    @Size(max = 50)
    private String sku;

    @NotNull
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal price;

    @NotNull
    @Min(0)
    private Integer quantity;
}
