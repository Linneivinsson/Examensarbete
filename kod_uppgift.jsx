// KATTIS KOD:
/*

import java.util.*;

class RekordData implements Comparable<RekordData> {
    private String ort;
    private double snoDjup;
    private int ar;

    public RekordData(String ort, double snoDjup, int ar) {
        this.ort = ort;
        this.snoDjup = snoDjup;
        this.ar = ar;
    }

    public String getOrt() {
        return ort;
    }

    public double getSnoDjup() {
        return snoDjup;
    }

    public int getAr() {
        return ar;
    }

    @Override
    public int compareTo(RekordData other) {
        if (this.snoDjup != other.snoDjup) {
            return Double.compare(other.snoDjup, this.snoDjup);
        }
        return this.ort.compareTo(other.ort);
    }
}

public class Snodjup {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Map<Integer, List<RekordData>> arTillData = new HashMap<>();

        while (scanner.hasNextLine()) {
            String[] delar = scanner.nextLine().split(" ", 3);
            int ar = Integer.parseInt(delar[0].substring(0, 4));
            String ort = delar[1];
            double snoDjup = Double.parseDouble(delar[2]);

            RekordData data = new RekordData(ort, snoDjup, ar);
            arTillData.computeIfAbsent(ar, k -> new ArrayList<>()).add(data);
        }

        List<Integer> arList = new ArrayList<>(arTillData.keySet());
        Collections.sort(arList);

        for (int ar : arList) {
            System.out.println(ar);
            List<RekordData> dataList = arTillData.get(ar);
            Collections.sort(dataList);
            int antal = Math.min(5, dataList.size());
            for (int i = 0; i < antal; i++) {
                RekordData data = dataList.get(i);
                System.out.printf("%s %.1f\n", data.getOrt(), data.getSnoDjup());
            }
        }
    }
}

*/