package com.as.repository.crud;

import com.as.model.Accessory;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 *
 * @author desarrolloextremo
 */
public interface AccessoryCrudRepository extends MongoRepository<Accessory, String> {
    
}
