package br.com.orbia.exception;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(RecursoNaoEncontradoException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public Map<String, String> recursoNaoEncontrado(
            RecursoNaoEncontradoException exception
    ) {

        Map<String, String> resposta = new HashMap<>();

        resposta.put("erro", exception.getMessage());

        return resposta;
    }

    @ExceptionHandler(RegraNegocioException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> regraNegocio(
            RegraNegocioException exception
    ) {

        Map<String, String> resposta = new HashMap<>();

        resposta.put("erro", exception.getMessage());

        return resposta;
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> validacao(
            MethodArgumentNotValidException exception
    ) {

        Map<String, String> erros = new HashMap<>();

        exception.getBindingResult()
                .getFieldErrors()
                .forEach(error ->
                        erros.put(error.getField(), error.getDefaultMessage())
                );

        return erros;
    }
}