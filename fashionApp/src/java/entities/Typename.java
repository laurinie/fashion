/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entities;

import java.io.Serializable;
import java.util.Collection;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

/**
 *
 * @author Joni
 */
@Entity
@Table(name = "typename")
//@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Typename.findAll", query = "SELECT t FROM Typename t")
    , @NamedQuery(name = "Typename.findById", query = "SELECT t FROM Typename t WHERE t.id = :id")
    , @NamedQuery(name = "Typename.findByName", query = "SELECT t FROM Typename t WHERE t.name = :name")})
public class Typename implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
//    @Size(max = 255)
    @Column(name = "name")
    private String name;
    @OneToMany(mappedBy = "type")
    private Collection<Productcard> productcardCollection;
    @OneToMany(mappedBy = "name")
    private Collection<Type> typeCollection;

    public Typename() {
    }

    public Typename(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @XmlTransient
    public Collection<Productcard> getProductcardCollection() {
        return productcardCollection;
    }

    public void setProductcardCollection(Collection<Productcard> productcardCollection) {
        this.productcardCollection = productcardCollection;
    }

    @XmlTransient
    public Collection<Type> getTypeCollection() {
        return typeCollection;
    }

    public void setTypeCollection(Collection<Type> typeCollection) {
        this.typeCollection = typeCollection;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Typename)) {
            return false;
        }
        Typename other = (Typename) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entities.Typename[ id=" + id + " ]";
    }
    
}
