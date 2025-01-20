// KATTIS KOD:
/*
UP C: Räkna bokstäver

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.Map;
import java.util.TreeMap;

public class LetterFrequency {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String input = reader.readLine(); // Läs hela strängen
        Map<Character, Integer> frequencyMap = new TreeMap<>();

        for (char c : input.toCharArray()) {
            if (Character.isLetter(c)) { // Kontrollera om tecknet är en bokstav
                char lowerCaseChar = Character.toLowerCase(c); // Gör tecknet till gemen
                frequencyMap.put(lowerCaseChar, frequencyMap.getOrDefault(lowerCaseChar, 0) + 1);
            }
        }

        if (frequencyMap.isEmpty()) {
            System.out.println("0");
        } else {
            StringBuilder output = new StringBuilder();
            for (Map.Entry<Character, Integer> entry : frequencyMap.entrySet()) {
                output.append(entry.getKey()).append(":").append(entry.getValue()).append("\n");
            }
            System.out.print(output.toString().trim()); // Ta bort eventuell sista radbrytning
        }
    }
}


UP D: Dekompression

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.Arrays;

public class Dekompression {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String input = reader.readLine();
        String[] parts = input.split(";");
        int maxLength = 0;

        for (String part : parts) {
            String[] keyAndPositions = part.split(":");
            String[] positions = keyAndPositions[1].trim().split(" ");
            for (String position : positions) {
                int pos = Integer.parseInt(position);
                maxLength = Math.max(maxLength, pos + keyAndPositions[0].length());
            }
        }

        char[] output = new char[maxLength];
        Arrays.fill(output, ' ');

        for (String part : parts) {
            String[] keyAndPositions = part.split(":");
            String key = keyAndPositions[0];
            String[] positions = keyAndPositions[1].trim().split(" ");
            for (String position : positions) {
                int pos = Integer.parseInt(position);
                for (int i = 0; i < key.length(); i++) {
                    output[pos + i] = key.charAt(i);
                }
            }
        }

        System.out.println(new String(output));
    }
}


UP E: Faktoradiska tal

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.math.BigInteger;

public class FaktoradiskaTal {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String faktoradisk = reader.readLine().trim();
        BigInteger decimal = new BigInteger(reader.readLine().trim());

        System.out.println(faktoradiskTillDecimal(faktoradisk));
        System.out.println(decimalTillFaktoradisk(decimal));
    }

    private static BigInteger faktoradiskTillDecimal(String faktoradisk) {
        BigInteger result = BigInteger.ZERO;
        int length = faktoradisk.length();
        for (int i = 0; i < length; i++) {
            char c = faktoradisk.charAt(length - 1 - i);
            int value = Character.isDigit(c) ? c - '0' : c - 'A' + 10;
            result = result.add(BigInteger.valueOf(value).multiply(fakultet(i + 1)));
        }
        return result;
    }

    private static String decimalTillFaktoradisk(BigInteger decimal) {
        StringBuilder faktoradisk = new StringBuilder();
        int i = 1;
        while (!decimal.equals(BigInteger.ZERO)) {
            BigInteger[] division = decimal.divideAndRemainder(fakultet(i));
            faktoradisk.insert(0, convertToChar(division[1].intValue()));
            decimal = division[0];
            i++;
        }
        return faktoradisk.toString();
    }

    private static BigInteger fakultet(int n) {
        BigInteger result = BigInteger.ONE;
        for (int i = 2; i <= n; i++) {
            result = result.multiply(BigInteger.valueOf(i));
        }
        return result;
    }

    private static char convertToChar(int value) {
        return (value < 10) ? (char) ('0' + value) : (char) ('A' + value - 10);
    }
}

UP F: Största ön

import java.io.*;
import java.util.*;

public class StörstaÖn {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        String[] dimensions = reader.readLine().split(" ");
        int x = Integer.parseInt(dimensions[0]);
        int y = Integer.parseInt(dimensions[1]);

        char[][] grid = new char[x][y];
        for (int i = 0; i < x; i++) {
            grid[i] = reader.readLine().toCharArray();
        }

        boolean[][] visited = new boolean[x][y];
        int maxIslandSize = 0;

        for (int i = 0; i < x; i++) {
            for (int j = 0; j < y; j++) {
                if (grid[i][j] == '@' && !visited[i][j]) {
                    maxIslandSize = Math.max(maxIslandSize, bfs(grid, visited, i, j));
                }
            }
        }

        System.out.println(maxIslandSize);
    }

    private static int bfs(char[][] grid, boolean[][] visited, int startX, int startY) {
        int[] dx = {0, 0, -1, 1};
        int[] dy = {-1, 1, 0, 0};

        Queue<int[]> queue = new ArrayDeque<>();
        queue.add(new int[]{startX, startY});
        visited[startX][startY] = true;

        int size = 0;

        while (!queue.isEmpty()) {
            int[] current = queue.poll();
            int x = current[0];
            int y = current[1];
            size++;

            for (int i = 0; i < 4; i++) {
                int newX = x + dx[i];
                int newY = y + dy[i];

                if (newX >= 0 && newX < grid.length && newY >= 0 && newY < grid[0].length &&
                        grid[newX][newY] == '@' && !visited[newX][newY]) {
                    queue.add(new int[]{newX, newY});
                    visited[newX][newY] = true;
                }
            }
        }

        return size;
    }
}

UP G: Snödjup

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;
import java.util.*;

class RekordData implements Comparable<RekordData> {
    String ort;
    double snödjup;
    int år;

    public RekordData(String ort, double snödjup, int år) {
        this.ort = ort;
        this.snödjup = snödjup;
        this.år = år;
    }

    @Override
    public int compareTo(RekordData other) {
        if (this.snödjup != other.snödjup) {
            return Double.compare(other.snödjup, this.snödjup);
        }
        return this.ort.compareTo(other.ort);
    }
}

public class Snödjup {
    public static void main(String[] args) throws IOException {
        BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));
        Map<Integer, List<RekordData>> årTillData = new TreeMap<>();
        String line;

        while ((line = reader.readLine()) != null && !line.isEmpty()) {
            String[] delar = line.split(" ", 3);
            int år = Integer.parseInt(delar[0].substring(0, 4));
            String ort = delar[1];
            double snödjup = Double.parseDouble(delar[2]);

            årTillData.putIfAbsent(år, new ArrayList<>());
            årTillData.get(år).add(new RekordData(ort, snödjup, år));
        }

        for (Map.Entry<Integer, List<RekordData>> entry : årTillData.entrySet()) {
            int år = entry.getKey();
            List<RekordData> data = entry.getValue();
            Collections.sort(data);

            System.out.println(år);
            for (int i = 0; i < Math.min(5, data.size()); i++) {
                RekordData rekord = data.get(i);
                System.out.printf("%s %.1f%n", rekord.ort, rekord.snödjup);
            }
        }
    }
}


*/