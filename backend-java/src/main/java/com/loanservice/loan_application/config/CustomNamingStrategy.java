package com.loanservice.loan_application.config;

import org.hibernate.boot.model.naming.CamelCaseToUnderscoresNamingStrategy;
import org.hibernate.boot.model.naming.Identifier;
import org.hibernate.engine.jdbc.env.spi.JdbcEnvironment;
import org.springframework.stereotype.Component;

@Component
public class CustomNamingStrategy extends CamelCaseToUnderscoresNamingStrategy {

    @Override
    public Identifier toPhysicalColumnName(Identifier name, JdbcEnvironment context) {
        String text = name.getText();

        // Preserve original column names with $...$ notation
        if (text.startsWith("$") && text.endsWith("$")) {
            return Identifier.toIdentifier(text.substring(1, text.length() - 1), name.isQuoted());
        }

        // Default behavior: Convert to snake_case
        return super.toPhysicalColumnName(name, context);
    }
}
