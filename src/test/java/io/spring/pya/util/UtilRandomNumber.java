package io.spring.pya.util;

import java.util.Random;

public class UtilRandomNumber {
    public static Long getRandomLong() {
        Random r = new Random();
        return (Long.MAX_VALUE) * r.nextLong();
    }
}
