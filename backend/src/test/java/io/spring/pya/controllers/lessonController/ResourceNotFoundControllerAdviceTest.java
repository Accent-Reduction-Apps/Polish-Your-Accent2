package io.spring.pya.controllers.lessonController;

import io.spring.pya.controllers.ResourceNotFoundControllerAdvice;
import io.spring.pya.exceptions.ResourceNotFoundException;
import io.spring.pya.providers.LessonProvider;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class ResourceNotFoundControllerAdviceTest {

    @Test
    public void testHandleLessonNotFoundException() {
        Long lessonNotFoundId = LessonProvider.getRandomId();
        String responseMessage = "No lesson found with id " + lessonNotFoundId;
        ResourceNotFoundControllerAdvice handler = new ResourceNotFoundControllerAdvice();
        ResourceNotFoundException ex = mock(ResourceNotFoundException.class);
        when(ex.getMessage()).thenReturn(responseMessage);

        ResponseEntity<String> response = handler.handleResourceNotFound(ex);
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals(responseMessage, response.getBody());
    }

}