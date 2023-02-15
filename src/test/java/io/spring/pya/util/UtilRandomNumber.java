package io.spring.pya.util;

public class UtilRandomNumber {
    public static Long getRandomLong() {
        long leftLimit = 0L;
        long rightLimit = Long.MAX_VALUE;
        return leftLimit + (long) (Math.random() * (rightLimit - leftLimit));
    }

    public static int getRandomInt(int leftLimit, int rightLimit) {
        return leftLimit + (int) (Math.random() * (rightLimit - leftLimit));
    }

}
