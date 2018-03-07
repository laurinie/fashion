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
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
@Table(name = "productcard")
//@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Productcard.findAll", query = "SELECT p FROM Productcard p")
    , @NamedQuery(name = "Productcard.findById", query = "SELECT p FROM Productcard p WHERE p.id = :id")
    , @NamedQuery(name = "Productcard.findByName", query = "SELECT p FROM Productcard p WHERE p.name = :name")
    , @NamedQuery(name = "Productcard.findByColor", query = "SELECT p FROM Productcard p WHERE p.color = :color")
    , @NamedQuery(name = "Productcard.findByTotalqty", query = "SELECT p FROM Productcard p WHERE p.totalqty = :totalqty")
    , @NamedQuery(name = "Productcard.findByPrice", query = "SELECT p FROM Productcard p WHERE p.price = :price")
    , @NamedQuery(name = "Productcard.findByWholesaleprice", query = "SELECT p FROM Productcard p WHERE p.wholesaleprice = :wholesaleprice")
    , @NamedQuery(name = "Productcard.findByRetailprice", query = "SELECT p FROM Productcard p WHERE p.retailprice = :retailprice")})
public class Productcard implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
//    @Size(max = 255)
    @Column(name = "name")
    private String name;
//    @Size(max = 255)
    @Column(name = "color")
    private String color;
    @Column(name = "totalqty")
    private Integer totalqty;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "price")
    private Float price;
    @Column(name = "wholesaleprice")
    private Float wholesaleprice;
    @Column(name = "retailprice")
    private Float retailprice;
    @JoinColumn(name = "type", referencedColumnName = "id")
    @ManyToOne
    private Typename type;
    @JoinColumn(name = "category", referencedColumnName = "id")
    @ManyToOne
    private Categoryname category;
    @OneToMany(mappedBy = "productcardID")
    private Collection<Item> itemCollection;

    public Productcard() {
    }

    public Productcard(Integer id) {
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

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public Integer getTotalqty() {
        return totalqty;
    }

    public void setTotalqty(Integer totalqty) {
        this.totalqty = totalqty;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public Float getWholesaleprice() {
        return wholesaleprice;
    }

    public void setWholesaleprice(Float wholesaleprice) {
        this.wholesaleprice = wholesaleprice;
    }

    public Float getRetailprice() {
        return retailprice;
    }

    public void setRetailprice(Float retailprice) {
        this.retailprice = retailprice;
    }

    public Typename getType() {
        return type;
    }

    public void setType(Typename type) {
        this.type = type;
    }

    public Categoryname getCategory() {
        return category;
    }

    public void setCategory(Categoryname category) {
        this.category = category;
    }

    @XmlTransient
    public Collection<Item> getItemCollection() {
        return itemCollection;
    }

    public void setItemCollection(Collection<Item> itemCollection) {
        this.itemCollection = itemCollection;
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
        if (!(object instanceof Productcard)) {
            return false;
        }
        Productcard other = (Productcard) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "entities.Productcard[ id=" + id + " ]";
    }
    
}
