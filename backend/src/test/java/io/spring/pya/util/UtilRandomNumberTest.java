package io.spring.pya.util;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class UtilRandomNumberTest {

    @Test
    public void UtilRandomNumber_returnRandomLong() {
        Long result = UtilRandomNumber.getRandomLong();
        assertTrue(result >= 0);
    }

}
