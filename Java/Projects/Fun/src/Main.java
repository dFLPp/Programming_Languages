import plataform.Plataform;
import atm.Atm;

import agency.Agency;

public class Main {
    public static void main(String[] args) {
        Plataform i = new Plataform();
        Atm atm = new Atm();

        //suponha q já existe uma agência cadastrada.
        Agency a = new Agency("1");

        //enquanto eu n aprendo Junit...
        i.eventLoop(a);
        atm.eventLoop(a);

    }
}