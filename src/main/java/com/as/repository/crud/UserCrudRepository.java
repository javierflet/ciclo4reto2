package com.as.repository.crud;

import com.as.model.User;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 *
 * @author desarrolloextremo
 */
public interface UserCrudRepository extends MongoRepository<User,Integer> {
    //aqui defino consultas adicionales que no estan predeterminadas en la Interfaz "MongoRepository"
    
    public Optional <User> findByEmail(String email);
    
    public Optional<User> findByEmailAndPassword(String email, String password);
    
}
