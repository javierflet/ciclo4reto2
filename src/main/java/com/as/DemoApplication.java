package com.as;

import com.as.model.Accessory;
import com.as.model.User;
import com.as.repository.crud.AccessoryCrudRepository;
import com.as.repository.crud.UserCrudRepository;
import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication implements CommandLineRunner {

    @Autowired
    private UserCrudRepository userRepo;
    @Autowired
    private AccessoryCrudRepository accesoryCrud;

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        System.out.println("Aqui se ejecutaran la creación de documentos de mongo...");
        
        userRepo.deleteAll();
        accesoryCrud.deleteAll();

//        //para efectos de formateo de fechas
//        SimpleDateFormat ft = new SimpleDateFormat("yyyy-MM-dd");
//        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd");
//
//        //Agregar documentos a la coleccion "usuarios"
//        userRepo.saveAll(
//                List.of(
//                        new User(1, "453423", "JUANA LA LOCA", "CL 34 NRO AAA..", "234123", "juanaloca@gmail.com", "Demo123.", "ZONA 1", "ADM"),
//                        new User(2, "3453423", "FELIPE EL HERMOSO", "CL 34 NRO AAA..", "234123", "felipeh@gmail.com", "Demo123.", "ZONA 1", "COORD"),
//                        new User(3, "253423", "ISABEL I", "CL 34 NRO AAA..", "234123", "isabelI@gmail.com", "Demo123.", "ZONA 1", "ASE"),
//                        new User(4, "34534423", "FERNANDO DE ARAGON", "CL 34 NRO AAA..", "234123", "ferchoviii@gmail.com", "Demo123.", "ZONA 1", "ASE")
//                ));
//
//        accesoryCrud.saveAll(
//                List.of(new Accessory("AP-903", "ACME", "MATERIAL 1", "PRESENTACION 1", "DESCRIPCION DETALLADA", true, 120000, 10, "https://www.avasoluciones.com/uploads/2021/09/910-006127.jpg"),
//                        new Accessory("AP-904", "ACME", "MATERIAL 2", "PRESENTACION 2", "DESCRIPCION DETALLADA", true, 130000, 10, "https://www.avasoluciones.com/uploads/2021/09/910-007.jpg")
//                ));
//        
//        
//        System.out.println("Listado de usuarios");
//        userRepo.findAll().forEach(System.out::println);
//        
//        System.out.println("Listado de Accesorios");
//        accesoryCrud.findAll().forEach(System.out::println);
//        
//        System.out.println("Listado de usuarios");
//        userRepo.findAll().forEach(System.out::println);
//        
//        Optional<User> usuario = userRepo.findByEmail("juanaloca@gmail.com");
//        
//        if (usuario.isEmpty())
//            System.out.println("El email juanalaloca@hotmail.es, no existe");
//        else
//            System.out.println("Datos del usuario: " + usuario.get());
//        
//      
//        Optional<User> usuarioDos = userRepo.findByEmailAndPassword("juanaloca@gmail.com","Demo123.");
//        
//        if (usuarioDos.isEmpty())
//            System.out.println("El usuario con juanalaloca@hotmail.es / Demo123.  , no existe");
//        else
//            System.out.println("Datos del usuario: " + usuarioDos.get());
        
        
    }
}
