package com.tarefas.api.repository;

import com.tarefas.api.dto.authentication.RegisterCreateDTO;
import com.tarefas.api.model.User;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@ActiveProfiles("test")
class UserRepositoryTest {

    @Autowired
    EntityManager entityManager;

    @Autowired
    UserRepository userRepository;

    private User createUser(RegisterCreateDTO data){
        String encryptedPassword = new BCryptPasswordEncoder().encode(data.password());
        User newUser = new User(data.username(), encryptedPassword);
        this.entityManager.persist(newUser);
        return newUser;
    }

    @Test
    @DisplayName("Encontra o usuário com sucesso a partir do username")
    void findByUsernameSuccess() {
        RegisterCreateDTO data = new RegisterCreateDTO("Alcides", "123");
        User newUser = this.createUser(data);

        UserDetails userEncontrado = userRepository.findByUsername(newUser.getUsername());

        assertThat(userEncontrado).isNotNull();
    }

    @Test
    @DisplayName("NÃO encontra o usuário a partir do username")
    void findByUsernameNaoEncontrado() {
        String username = "Alcides";
        UserDetails userBuscado= userRepository.findByUsername(username);

        assertThat(userBuscado).isNull();
    }
}