package io.spring.pya.exceptions;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String resourceName, Long id) {
        super("No " + resourceName + " found with id " + id);
    }
}
